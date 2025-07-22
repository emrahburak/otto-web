
import React, { useEffect, useState } from 'react'
import { NetlifyForm, Honeypot } from 'react-netlify-forms'
import { Button } from '../../ui/Button';
import { toast } from "sonner"

interface FormRenderProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  success: boolean;
  error: boolean;
}


const ContactField = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <NetlifyForm name="Contact" action="/thanks" honeypotName="bot-field" >
      {({ handleChange, success, error }: FormRenderProps) => {

        // Başarı durumunda formu sıfırla
        useEffect(() => {
          if (success) {
            toast.success("Mesajınız başarıyla iletildi!")
            setFormData({ name: '', email: '', message: '' });
          }
          if (error) {
            toast.error("Bir hata oluştu, lütfen tekrar deneyin.")
          }
        }, [success, error]);


        return (
          <>
            <div className='grid grid-cols-1 gap-5 h-full w-full px-5 '>
              <Honeypot />
              <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                <div>
                  <label htmlFor="name"></label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => {
                      handleChange(e);
                      handleInputChange(e);
                    }}
                    required
                    placeholder='Ad/Soyad'
                    className='bg-white p-4 rounded-full w-full focus:outline-2 focus:outline-orange-01'
                  />
                </div>

                <div>
                  <label htmlFor="email"></label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleChange(e);
                      handleInputChange(e);
                    }}
                    required
                    placeholder='Email'
                    className='bg-white p-4 rounded-full w-full focus:outline-2 focus:outline-orange-01'
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message"></label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    handleChange(e);
                    handleInputChange(e);
                  }}
                  required
                  placeholder='Mesaj'
                  className='bg-white focus:outline-2 focus:outline-orange-01 p-4 rounded-4xl w-full'
                />
              </div>

              <div className='flex items-center justify-center w-full'>
                <Button className='bg-green-01 rounded-full py-3 text-white font-display px-10 cursor-pointer text-lg'>
                  <button type="submit" className='w-full h-full'>GÖNDER</button>
                </Button>
              </div>
            </div>
          </>
        );
      }}
    </NetlifyForm>
  );
};

export default ContactField;

