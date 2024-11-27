import React from 'react'
import Lottie, { LottieComponentProps } from 'lottie-react'

interface LottieAnimationProps extends Omit<LottieComponentProps, 'animationData'> {
  animationData: any;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({ 
  animationData, 
  loop = true, 
  autoplay = true, 
  style,
  ...props
}) => {
  return (
    <Lottie 
      animationData={animationData} 
      loop={loop} 
      autoplay={autoplay} 
      style={style}
      {...props}
    />
  )
}

export default LottieAnimation

