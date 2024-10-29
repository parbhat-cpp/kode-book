import React from "react";

interface FeaturesCardProps {
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
}

const FeaturesCard = (props: FeaturesCardProps) => {
  return (
    <div className="p-5 border-4 border-lpPrimaryBg rounded-xl">
      <div className="flex justify-center my-2">{props.icon}</div>
      <div className="grid gap-3">
        <h4 className="font-medium">{props.heading}</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default FeaturesCard;
