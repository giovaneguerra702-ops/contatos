// app/components/ContactItem.jsx
"use client";

const ContactItem = ({ contact, onRemove }) => {
    const handleRemove = (id) => {
        setContacts((prev) => prev.filter((c) => c.id !== id));
    };
    return (
        <li className="p-4 flex items-center justify-between">
            <div>
                <p className="font-medium text-gray-900">{contact.nome}</p>
                <p className="text-sm text-gray-600">
                    {contact.email} • {contact.telefone}
                </p>
            </div>
            <button
                onClick={() => onRemove(contact.id)}
                className="text-red-600 hover:text-red-700 px-2 py-1 rounded"
            >
                Excluir
            </button>
        </li>
    );
};

export default ContactItem;