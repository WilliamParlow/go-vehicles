export const Form = ({ children, onSubmit }: {children: any, onSubmit: any}) => {
    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit(e);
        }} className="flex flex-col space-y-4 p-4 bg-gray-50 rounded shadow">
            {children}
        </form>
    );
}

export const FormControl = ({ children }: {children: any}) => {
    return (
        <div className="flex space-y-2 gap-8 w-full">
            {children}
        </div>
    );
}

export const FormField = ({ label, children }: {label: string, children: any}) => {
    return (
        <div className="flex flex-col space-y-2 w-full">
            <label className="text-gray-700 font-bold">{label}</label>
            {children}
        </div>
    );
}