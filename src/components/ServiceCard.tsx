import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, CheckCircle2 } from "lucide-react";
import { iconMap } from "@/lib/icon-map";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  showModal: boolean;
  serviceImages?: string[];
}


interface IPortfolioModal {
  selectedItem: ServiceCardProps;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ServiceCardModal = ({ selectedItem, isModalOpen, setIsModalOpen }: IPortfolioModal) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-lg sm:max-w-3xl lg:max-w-4xl space-y-2">
        <DialogHeader className="space-y-2 block">
          <DialogTitle className="text-lg lg:text-2xl font-bold text-center">{selectedItem.title}</DialogTitle>
          {selectedItem.description && <DialogDescription className="text-center">{selectedItem.description}</DialogDescription>}
        </DialogHeader>


        <div className="flex flex-row flex-wrap justify-between items-center">
          {selectedItem.serviceImages && selectedItem.serviceImages.length > 0 && selectedItem.serviceImages.map((img, idx) => {
            return (
              <div key={idx} className="w-24 h-24 p-2 rounded-lg border border-border bg-card flex items-center justify-center">
                <img src={img} alt={`Service Image ${idx + 1}`} className="max-w-full max-h-full object-contain aspect-square" />
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const ServiceCard = ({ title, description, icon, features, showModal, serviceImages }: ServiceCardProps) => {
  const Icon = iconMap[icon] ?? Code2;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.32, ease: [0.25, 0.4, 0.25, 1] }}
        className="group relative rounded-2xl border border-border bg-card card-elevated p-6 md:p-8 overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500 blur-2xl" />

        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-6 group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-300 border border-primary/20">
            <Icon className="h-6 w-6 text-secondary" />
          </div>

          <h3 className="text-xl font-display font-semibold text-foreground mb-2.5">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{description}</p>

          <ul className="space-y-2.5">
            {features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {isModalOpen && showModal && <ServiceCardModal selectedItem={{
        title,
        description,
        icon,
        features,
        showModal,
        serviceImages
      }} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </>
  );
};

export default ServiceCard;
