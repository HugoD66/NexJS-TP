type Props = {
  children: React.ReactNode;
};

export default function ProductLayout({ children }: Props) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      {children}
    </div>
  );
}
