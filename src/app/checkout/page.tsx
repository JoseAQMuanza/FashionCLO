"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CartSummary from "../components/cart-summary";
import { useCart } from "../context/cart-context";

const checkoutSchema = z
  .object({
    fullName: z.string().trim().min(1, "Informe seu nome completo."),
    email: z.string().trim().email("Digite um e-mail válido."),
    phone: z
      .string()
      .trim()
      .min(1, "Informe um número de telefone.")
      .refine((value) => {
        const digits = value.replace(/\D/g, "");
        return digits.length === 9 && digits.startsWith("9");
      }, "Digite um número válido com 9 dígitos."),
    address: z.string().trim().min(1, "Informe o endereço de entrega."),
    paymentMethod: z.enum(["card", "xpress"]),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvv: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.paymentMethod !== "card") return;

    const cardDigits = (values.cardNumber ?? "").replace(/\D/g, "");

    if (cardDigits.length !== 16) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardNumber"],
        message: "O número do cartão deve ter 16 dígitos.",
      });
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.cardExpiry ?? "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardExpiry"],
        message: "Use o formato MM/AA.",
      });
    }

    if (!/^\d{3,4}$/.test((values.cardCvv ?? "").trim())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cardCvv"],
        message: "O CVV deve ter 3 ou 4 dígitos.",
      });
    }
  });

type CheckoutFormData = z.infer<typeof checkoutSchema>;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <span className="text-sm font-medium text-red-600">{message}</span>;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    setSubmitMessage("");
  }, [paymentMethod]);

  const onSubmit = async () => {
    setSubmitMessage("Processando seu pedido...");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    router.push("/checkout/success");
  };

  const inputClass =
    "mt-1 w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-900 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black";
  const cardClass = "rounded-xl border border-slate-100 bg-white p-6 shadow-sm";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 lg:px-8">
      <div className="mb-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-amber-300">Checkout seguro</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
          Finalize seu pedido com segurança
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-200 md:text-base">
          Falta pouco para suas peças favoritas chegarem até você. Ambiente 100% criptografado e
          seguro para concluir sua compra com tranquilidade.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <strong className="font-semibold">Compra protegida:</strong>
        <span className="ml-2">Seu pagamento é tratado com segurança e confirmação imediata.</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className={cardClass}>
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-slate-900">
              1. Dados de entrega
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-medium text-slate-900">
                Nome completo
                <input
                  {...register("fullName")}
                  className={inputClass}
                  type="text"
                  placeholder="Evânio Cassule"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                />
                <FieldError message={errors.fullName?.message} />
              </label>

              <label className="grid gap-1 text-sm font-medium text-slate-900">
                E-mail
                <input
                  {...register("email")}
                  className={inputClass}
                  type="email"
                  placeholder="evanio@email.com"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                />
                <FieldError message={errors.email?.message} />
              </label>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-medium text-slate-900">
                Telefone
                <input
                  {...register("phone")}
                  className={inputClass}
                  type="tel"
                  placeholder="932 291 092"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                />
                <FieldError message={errors.phone?.message} />
              </label>

              <label className="grid gap-1 text-sm font-medium text-slate-900">
                Endereço
                <input
                  {...register("address")}
                  className={inputClass}
                  type="text"
                  placeholder="Kilamba, Luanda"
                  autoComplete="street-address"
                  aria-invalid={Boolean(errors.address)}
                />
                <FieldError message={errors.address?.message} />
              </label>
            </div>
          </div>

          <div className={cardClass}>
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-slate-900">2. Pagamento</h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  paymentMethod === "card"
                    ? "border-black bg-slate-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value="card"
                  className="h-4 w-4 accent-black"
                />
                <span className="font-medium text-slate-900">Cartão de crédito</span>
              </label>

              <label
                className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                  paymentMethod === "xpress"
                    ? "border-black bg-slate-50"
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <input
                  {...register("paymentMethod")}
                  type="radio"
                  value="xpress"
                  className="h-4 w-4 accent-black"
                />
                <span className="font-medium text-slate-900">Xpress / Transferência</span>
              </label>
            </div>

            {paymentMethod === "card" ? (
              <div className="mt-5 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1 text-sm font-medium text-slate-900">
                    Número do cartão
                    <input
                      {...register("cardNumber")}
                      className={inputClass}
                      type="text"
                      inputMode="numeric"
                      placeholder="0000 0000 0000 0000"
                      autoComplete="cc-number"
                      aria-invalid={Boolean(errors.cardNumber)}
                    />
                    <FieldError message={errors.cardNumber?.message} />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1 text-sm font-medium text-slate-900">
                      Validade
                      <input
                        {...register("cardExpiry")}
                        className={inputClass}
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/AA"
                        autoComplete="cc-exp"
                        aria-invalid={Boolean(errors.cardExpiry)}
                      />
                      <FieldError message={errors.cardExpiry?.message} />
                    </label>

                    <label className="grid gap-1 text-sm font-medium text-slate-900">
                      CVV
                      <input
                        {...register("cardCvv")}
                        className={inputClass}
                        type="text"
                        inputMode="numeric"
                        placeholder="123"
                        autoComplete="cc-csc"
                        aria-invalid={Boolean(errors.cardCvv)}
                      />
                      <FieldError message={errors.cardCvv?.message} />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                Você será redirecionado ou receberá as instruções para pagamento via aplicativo após
                confirmar o pedido.
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-black px-4 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Processando pagamento..." : "Confirmar e pagar"}
          </button>

          {submitMessage ? (
            <p className="text-center text-sm font-medium text-slate-600" aria-live="polite">
              {submitMessage}
            </p>
          ) : null}
        </form>

        <div className="space-y-4">
          <CartSummary />
          <div className="rounded-xl border border-slate-100 bg-white p-5 text-sm text-slate-700 shadow-sm">
            <p className="font-semibold text-slate-900">Compra segura</p>
            <p className="mt-2">Seus dados são protegidos durante todo o processo de pagamento.</p>
            <div className="mt-4">
              <Link href="/produtos" className="font-medium text-black underline-offset-4 hover:underline">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
