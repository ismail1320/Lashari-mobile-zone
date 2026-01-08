'use client';

import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppFloat() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSettings(data.data);
        }
      })
      .catch((err) => console.error('Error fetching settings:', err));
  }, []);

  const whatsappNumber = settings?.whatsappNumber || '03445979016';
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Hello! I would like to inquire about your mobile repair services.`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}
