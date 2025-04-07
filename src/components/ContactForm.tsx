"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { createContact } from "@/utils/actions";
import { CarProps } from "@/types";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn, generateEmailBody, sendEmail } from "@/lib/utils";
import { calculatePriceTotal, formatToBrl } from "@/utils";

import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { SanityDocument } from "@sanity/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { hours_rent } from "@/constants";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres.",
  }),
  email: z.string().email({
    message: "Coloque um email válido.",
  }),
  phone: z.string().min(11, {
    message: "Coloque um número válido.",
  }),
  car: z.string(),
  startDate: z.date(),
  timeStartDate: z.string(),
  endDate: z.date(),
  timeEndDate: z.string(),
});

const ContactForm = ({ car, fee }: { car: CarProps; fee: number }) => {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const [priceTotal, setPriceTotal] = useState<string | number>(
    formatToBrl(car.price)
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      car: car.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsPending(true);

      const respo: SanityDocument<Record<string, any>> = await createContact(
        values,
        car,
        fee
      );

      // Envio do e-mail
      try {
        const emailData = {
          to: "lucanegresco@gmail.com", // Substitua pelo destinatário real
          subject: "Nova Pré-Reserva de Carro",
          html: generateEmailBody({
            ...values, // Passa os valores do formulário
            startDate: format(values.startDate, "yyyy-MM-dd"), // Converte para string
            endDate: format(values.endDate, "yyyy-MM-dd"), // Converte para string
            priceTotal, // Inclui o preço total calculado
          }),
        };
        await sendEmail(emailData);
      } catch (emailError) {
        console.error("Erro ao enviar o email:", emailError);
      }

      localStorage.setItem("user-info", respo._id);

      toast({
        title: "Reserva feita com sucesso",
        description: "Aguarde que entraremos em contato",
      });
      navigate("/your-info");
    } catch (error) {
      toast({
        title: "Um erro inesperado ocorreu, tente novamente.",
        description: "",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 space-y-5 w-full md:flex gap-4 justify-around"
      >
        <div className="flex flex-col gap-4 md:w-[30%]">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Telefone..." {...field} maxLength={11} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Retirada</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "MM/dd/yyyy")
                        ) : (
                          <span>Escolha o dia</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      lang="pt"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeStartDate"
            render={({ field }) => (
              <FormItem className="max-w-[240px]">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Horário de retirada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hours_rent.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Devolução</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "MM/dd/yyyy")
                        ) : (
                          <span>Escolha o dia</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      lang="pt"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeEndDate"
            render={({ field }) => (
              <FormItem className="max-w-[240px]">
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Horário de devolução" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hours_rent.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => {
              const endDate = form.getValues().endDate;
              const startDate = form.getValues().startDate;

              const priceTotal = calculatePriceTotal(
                endDate,
                startDate,
                car,
                fee
              );

              setPriceTotal(priceTotal);
            }}
            variant="outline"
            className="bg-yellow-300 text-black"
            disabled={isPending}
          >
            Calcular preço total
          </Button>
        </div>

        <div className="flex flex-col gap-2 border-t-2 border-gray-100 p-2">
          <div className="space-y-2">
            <p>Taxa de aluguel ({fee}%)</p>
            <p>
              <b>{formatToBrl(car.price)}</b>/dia
            </p>
            <p className="">
              <b>{priceTotal}</b>/total
            </p>
          </div>
          <Button
            type="submit"
            variant="outline"
            className="bg-primary-blue text-white md:w-64"
            disabled={isPending}
          >
            {isPending ? "Enviando..." : "Pré-reservar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
