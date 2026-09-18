"use client";
import Link from 'next/link';

const ContactItem = ({ contact, onRemove }) => {
    return (
        <li className="p-4 border border-gray-200 rounded-lg flex items-center justify-between hover:bg-gray-50">
            <div className="flex-1">
                <Link
                    href={`/contact/${contact.id}`}
                    className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                >
                    {contact.nome}
                </Link>
                <p className="text-sm text-gray-600">
                    {contact.email} • {contact.telefone}
                </p>
            </div>
            <button
                onClick={() => onRemove(contact.id)}
                className="text-red-600 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50"
            >
                Excluir
            </button>
        </li>
    );
};

export default ContactItem;