import React, { useState, useEffect } from 'react';
import '../css/robot.css';


function RobotReact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const robotRef = React.useRef(null);

  // Get robot's fixed position (e.g., center of the screen)
  const robotX = 300; // fixed x position
  const robotY = 300; // fixed y position

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate angle between robot and mouse
  const angleDeg = Math.atan2(mousePos.y - robotY, mousePos.x - robotX) * (180 / Math.PI);

  return (
    <div className='robotContainer'>
      {/* Fixed position robot */}
      <div
        ref={robotRef}
        style={{
          position: 'absolute',
          left: robotX,
          top: robotY,
          transform: `translate(-50%, -50%) rotate(${angleDeg}deg)`,
          transformOrigin: 'center',
          fontSize: '60px',
        }}
      >

        
        <img className='robot' src={require('../assets/robothead.jpg')} alt='Robot'/>
      </div>
    </div>
  );
}

export default RobotReact;