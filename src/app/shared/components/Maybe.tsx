export default function Maybe ({ test, children }: any) {
    return (
        <>{test && children}</>
    )
};