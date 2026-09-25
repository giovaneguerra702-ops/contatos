"use client";
import { useState } from "react";
import { useEffect } from 'react';
import { useMemo } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import FilterInput from "./components/FilterInput";
import Statistics from "./components/Statistics";

const HomePage = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const handleAdd = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleRemove = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Filtrar contatos baseado no termo de busca
  const filteredContacts = useMemo(() => {
    console.log('Filtrando contatos...'); // Só executa quando contacts ou filter mudam
    
    if (!filter.trim()) {
      return contacts;
    }
    
    return contacts.filter(contact =>
      contact.nome.toLowerCase().includes(filter.toLowerCase()) ||
      contact.email.toLowerCase().includes(filter.toLowerCase()) ||
      contact.telefone.includes(filter)
    );
  }, [contacts, filter]);

  // Adicione este useEffect após os estados
  useEffect(() => {
    const savedContacts = localStorage.getItem('contatos');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
    setIsLoaded(true);
  }, []);
  
  // Adicione este useEffect após o anterior
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('contatos', JSON.stringify(contacts));
    }
  }, [contacts, isLoaded]);

  const stats = useMemo(() => {
    console.log('Calculando estatísticas...');

    const total = contacts.length;
    const comEmail = contacts.filter(c => c.email).length;
    const comTelefone = contacts.filter(c => c.telefone).length;

    return {
      total,
      comEmail,
      comTelefone,
      semEmail: total - comEmail,
      semTelefone: total - comTelefone
    };
  }, [contacts]);


  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Cadastro de Contatos
          </h1>
          <FilterInput value={filter} onChange={setFilter}/>
        </header>

        <ContactForm onAdd={handleAdd} />
        <Statistics stats={stats}/>
        <ContactList items={contacts} onRemove={handleRemove} />
        <ContactList items={filteredContacts} onRemove={handleRemove} />
      </div>
    </div>
  );
};

export default HomePage;