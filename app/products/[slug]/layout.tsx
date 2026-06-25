type Props = {
  children: React.ReactNode;
  similar: React.ReactNode;
  sponsored: React.ReactNode;
};

export default function ProductLayout({ children, similar, sponsored }: Props) {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
      {children}
      {similar}
      {sponsored}
    </div>
  );
}
