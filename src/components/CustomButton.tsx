import { CustomButtonProps } from "@/types";

const CustomButton = ({
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  rightIcon,
  lucideIcon,
  handleClick,
}: CustomButtonProps) => (
  <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}
  >
    <span className={`flex-1 ${textStyles}`}>{title}</span>
    {rightIcon && (
      <div className="relative w-6 h-6">
        <img src={rightIcon} alt="arrow_left" className="object-contain" />
      </div>
    )}
    {lucideIcon && <div className="relative w-6 h-6 mx-2">{lucideIcon}</div>}
  </button>
);

export default CustomButton;
