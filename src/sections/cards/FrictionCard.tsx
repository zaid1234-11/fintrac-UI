import EditorialCard from "@/components/EditorialCard";

export default function FrictionCard() {
  return (
    <EditorialCard
      title="Behavioral Friction"
      index={3}
      imageSrc="/card-bg.png"
    >
      <div className="mt-4 mb-16 max-w-[240px]">
        <p className="text-white/70 text-lg leading-relaxed mb-6 font-medium">
          Some habits are harder to change than others.
        </p>
        <p className="text-white/50 text-sm leading-relaxed">
          Our engine measures the psychological resistance to spending changes across your categories. Instead of fighting friction, we route your financial growth through the paths of least resistance.
        </p>
      </div>
    </EditorialCard>
  );
}
