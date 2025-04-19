
interface ButtonProps {
    children: React.ReactNode;
    className: string;
}

export default function Button({ className,children }: ButtonProps) {
    return (
        <button className={`${className}  rounded-2xl py-2 px-4 border-0`}>{children}</button>
    )
};