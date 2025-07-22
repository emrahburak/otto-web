
import React from 'react'
import { NetlifyForm, Honeypot } from 'react-netlify-forms'

interface FormRenderProps {
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  success: boolean;
  error: boolean;
}

const ContactField = () => (
  <NetlifyForm name="Contact" action="/thanks" honeypotName="bot-field" >
    {({ handleChange, success, error }: FormRenderProps) => (
      <>
        <div className='grid grid-cols-1 gap-3 '>
          <Honeypot />
          {success && <p>Thanks for contacting us!</p>}
          {error && <p>Sorry, something went wrong.</p>}

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label htmlFor="name"></label>
              <input type="text" name="name" id="name" onChange={handleChange} required  placeholder='Ad/Soyad' className='bg-white  p-4 rounded-full  w-full focus:outline-2 focus:outline-orange-01'/>
            </div>

            <div>
              <label htmlFor="email"></label>
              <input type="email" name="email" id="email" onChange={handleChange} required placeholder='Email' className='bg-white  p-4 rounded-full  w-full focus:outline-2 focus:outline-orange-01'/>
            </div>
          </div>

          <div >
            <label htmlFor="message"></label>
            <textarea name="message" id="message" rows={4} onChange={handleChange} required placeholder='Mesaj' className='bg-white focus:outline-2 focus:outline-orange-01 p-4 rounded-4xl  w-full'/>
          </div>

          <div className='flex items-center justify-center w-full'>
            <button type="submit" className='bg-green-01 rounded-full py-3 text-white font-display-02 px-6 cursor-pointer '>Submit</button>
          </div>


        </div>
      </>
    )}
  </NetlifyForm>
)

export default ContactField

