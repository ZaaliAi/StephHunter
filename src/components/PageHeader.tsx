
type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="bg-secondary text-secondary-foreground py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
