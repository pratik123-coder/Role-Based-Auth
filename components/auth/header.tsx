

interface HeaderProps {
    lable: string;
};

export const Header = ({ lable }: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-3xl font-semibold">Authenticator</h1>
            <p className="text-muted-foreground text-sm">{lable}</p>
        </div>
    );
}