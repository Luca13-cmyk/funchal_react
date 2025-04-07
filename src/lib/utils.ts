import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const sendEmail = async (emailData: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const response = await axios.post(
      "https://funchal.vercel.app/api/send-email",
      emailData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ); // Adjust endpoint as needed
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const generateEmailBody = (formData: {
  name: string;
  email: string;
  phone: string;
  car: string;
  startDate: string;
  timeStartDate: string;
  endDate: string;
  timeEndDate: string;
  priceTotal: string | number;
}) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #0056b3;">Nova Pré-Reserva de Carro</h2>
    <p>Você recebeu uma nova pré-reserva com os seguintes detalhes:</p>
    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nome:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefone:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.phone}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Carro:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.car}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data de Retirada:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.startDate} às ${formData.timeStartDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data de Devolução:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.endDate} às ${formData.timeEndDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Preço Total:</td>
        <td style="padding: 8px; border: 1px solid #ddd;">${formData.priceTotal}</td>
      </tr>
    </table>
    <p style="margin-top: 20px;">Entre em contato com o cliente para confirmar a reserva.</p>
    <p style="color: #555;">Este é um e-mail automático. Por favor, não responda.</p>
  </div>
`;
