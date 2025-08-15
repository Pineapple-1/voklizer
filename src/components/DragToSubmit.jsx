import { useEffect, useState, useRef } from "react";
import { createGesture } from '@ionic/react';

/**
 * DragToSubmit - A reusable draggable slider component for form submission or custom actions
 * 
 * @param {Function} onSubmit - Function to call when drag is completed (required)
 * @param {string} text - Text to display (default: "Drag to Submit")
 * @param {string} draggingText - Text to display while dragging (default: "Release to Submit")
 * @param {string} containerClassName - Additional CSS classes for container
 * @param {string} sliderColor - Color of the slider bar (default: "bg-purple")
 * @param {string} trackColor - Color of the track (default: "bg-gray-300")
 * @param {number} completionThreshold - Percentage to complete action (default: 0.8)
 * @param {number} resetDelay - Delay before reset in ms (default: 200)
 * @param {boolean} disabled - Disable the component (default: false)
 * @param {object} style - Additional inline styles
 */
function DragToSubmit({
  onSubmit,
  text = "Drag to Submit",
  draggingText = "Release to Submit",
  containerClassName = "",
  sliderColor = "bg-purple",
  trackColor = "bg-gray-300",
  completionThreshold = 0.65,
  resetDelay = 200,
  disabled = false,
  style = {}
}) {
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const previousPositionRef = useRef(0);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const gestureRef = useRef(null);
  const startPositionRef = useRef(0);

  // Initialize Ionic gesture
  useEffect(() => {
    if (!trackRef.current || disabled) return;

    const gesture = createGesture({
      el: trackRef.current,
      threshold: 15,
      direction: 'x',
      gestureName: 'drag-to-submit',
      onStart: (detail) => {
        if (hasCompleted || disabled) return;
        
        setIsDragging(true);
        startPositionRef.current = sliderPosition;
        previousPositionRef.current = sliderPosition;
        
        // Disable page scrolling during drag
        document.body.style.overflow = 'hidden';
        document.body.style.touchAction = 'none';
      },
      onMove: (detail) => {
        if (hasCompleted || disabled || !containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const trackWidth = containerRect.width * 0.5; // Half the container width (w-1/2)
        const purpleBarWidth = 40; // Fixed width of purple bar
        
        // Calculate new position based on gesture delta
        let newPosition = startPositionRef.current + detail.deltaX;
        newPosition = Math.max(0, newPosition);
        
        // Check if purple bar exceeds track boundaries
        const purpleBarEnd = newPosition + purpleBarWidth;
        const isMovingForward = newPosition > previousPositionRef.current;
        
        setSliderPosition(newPosition);
        previousPositionRef.current = newPosition;
        
        // Complete if moving forward and purple bar exceeds track width
        if (isMovingForward && purpleBarEnd >= trackWidth && !hasCompleted) {
          setHasCompleted(true);
          
          // Re-enable scrolling immediately
          document.body.style.overflow = '';
          document.body.style.touchAction = '';
          
          if (onSubmit) {
            onSubmit();
          }
        }
      },
      onEnd: (detail) => {
        // Re-enable scrolling
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        
        // Always reset if not completed, regardless of isDragging state
        if (!hasCompleted) {
          setIsDragging(false);
          setSliderPosition(0);
          previousPositionRef.current = 0;
          startPositionRef.current = 0;
        }
      }
    });

    gesture.enable();
    gestureRef.current = gesture;
    setIsInitialized(true);

    return () => {
      if (gestureRef.current) {
        gestureRef.current.destroy();
      }
    };
  }, [trackRef.current, disabled, hasCompleted, completionThreshold, onSubmit]);

  // Reset completion state and improve restart behavior
  useEffect(() => {
    if (hasCompleted) {
      const timer = setTimeout(() => {
        setHasCompleted(false);
        setSliderPosition(0);
        previousPositionRef.current = 0;
        setIsDragging(false); // Ensure clean state
        startPositionRef.current = 0; // Reset start position
      }, resetDelay);
      
      return () => clearTimeout(timer);
    }
  }, [hasCompleted, resetDelay]);


  const defaultContainerClass = "bg-[#D9D9D960] rounded-xl py-[10px] flex justify-between items-center px-3 relative cursor-pointer select-none";
  const combinedContainerClass = `${defaultContainerClass} ${containerClassName}`;

  const defaultStyle = {
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
    WebkitTapHighlightColor: 'transparent',
    touchAction: isDragging ? 'none' : 'manipulation',
    overscrollBehavior: 'none',
    WebkitOverflowScrolling: 'touch',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={combinedContainerClass}
      style={defaultStyle}
      ion-no-router="true"
      data-ion-disable-touch="true"
    >
      <div 
        ref={trackRef}
        className="relative w-1/2 h-1.5  overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ 
          backgroundColor: trackColor.replace('bg-', '') || '#D1D5DB',
          // Extended touch area for better dragging
          paddingTop: '12px',
          paddingBottom: '12px',
          marginTop: '-12px',
          marginBottom: '-12px'
        }}
      >
        <div 
          ref={sliderRef}
          className={`h-1.5 ${sliderColor} rounded-2xl absolute cursor-grab active:cursor-grabbing ${
            isDragging ? 'transition-none' : 'transition-all duration-300 ease-out shrink-0'
          }`}
          style={{ 
            top: '12px', // Offset for the extended touch area
            left: '0',
            width: '120px', // Fixed width - no more elongating
            transform: `translateX(${sliderPosition}px)`
          }}
        />
      </div>
      <div className="text-sm select-none pointer-events-none">
        {isDragging ? draggingText : text}
      </div>
    </div>
  );
}

export default DragToSubmit;