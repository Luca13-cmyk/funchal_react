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
import { cn } from "@/lib/utils";
import { rent_fee } from "@/constants";
import { calculatePriceTotal, formatToBrl } from "@/utils";

import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { SanityDocument } from "@sanity/client";

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
  endDate: z.date(),
});

const ContactForm = ({ car }: { car: CarProps }) => {
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
        car
      );

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
          <Button
            type="button"
            onClick={() => {
              const endDate = form.getValues().endDate;
              const startDate = form.getValues().startDate;

              const priceTotal = calculatePriceTotal(endDate, startDate, car);

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
            <p>Taxa de aluguel ({rent_fee.toString().replace("1.", "")}%)</p>
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
            {isPending ? "Enviando..." : "Reservar"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
