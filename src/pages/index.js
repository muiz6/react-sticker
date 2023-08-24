import React, { useEffect, useRef, useState } from "react"

import { MdSync } from "react-icons/md";

export default function Home() {
  const [rotateGesure, setRotateGesture] = useState(false);
  const rotateBtnRef = useRef(null);
  const [origin, setOrigin] = useState();
  const [mouseOldPos, setMouseOldPos] = useState();
  const [rotation, setRotation] = useState(0);
  const imgRef = useRef(null);

  const handleRotate = ({ mouseViewportX, mouseViewportY }) => {
    const angle1 = getAngle({
      x: mouseViewportX - origin.x,
      y: origin.y - mouseViewportY,
    });
    const angle2 = getAngle({
      x: mouseOldPos.x - origin.x,
      y: origin.y - mouseOldPos.y,
    });
    const delta = angle2 - angle1;
    setRotation(rotation + delta);
  };

  const onMouseMove = (event) => {
    const flags = event.buttons !== undefined ? event.buttons : event.which;
    const primaryMouseButtonDown = (flags & 1) === 1;
    const mouseViewportX = event.pageX - window.scrollX;
    const mouseViewportY = event.pageY - window.scrollY;
    setMouseOldPos({ x: mouseViewportX, y: mouseViewportY });

    if (primaryMouseButtonDown) {
      if (rotateGesure) {
        handleRotate({ mouseViewportX, mouseViewportY });
        return;
      }

      const insideRotate = isPointInsideElement({
        x: mouseViewportX,
        y: mouseViewportY,
      }, rotateBtnRef.current);
      if (insideRotate) {
        setRotateGesture(true);
        return;
      }
    } else {
      setRotateGesture(false);
    }
  };

  useEffect(() => {
    const rect = imgRef.current.getBoundingClientRect();
    setOrigin({
      x: rect.left - window.scrollX + (rect.width / 2),
      y: rect.top - window.scrollY + (rect.height / 2),
    });
  }, []);

  return (
    <section>
      <div className="flex justify-center items-center bg-[url(/assets/bg.webp)] py-20" onMouseMove={onMouseMove}>
        <div className="border-dashed border-4 border-gray-900 relative" style={{ rotate: `${rotation}deg` }}>
          <img src="/assets/psyduck.png" className="select-none" draggable={false} ref={imgRef} />

          <div
            className="bg-white shadow-lg p-2 absolute left-0 bottom-0 -translate-x-1/2 translate-y-1/2 rounded-full"
            ref={rotateBtnRef}
          >
            <MdSync />
          </div>
        </div>
      </div>
    </section>
  )
}

function isPointInsideElement(point, element) {
  const rect = element.getBoundingClientRect();
  return point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom;
}

function getAngle(point) {
  if (point.x < 0 && point.y > 0) {
    return 180 + (Math.atan(point.y / point.x) * 180 / Math.PI);
  }
  if (point.x > 0 && point.y < 0) {
    return 360 + (Math.atan(point.y / point.x) * 180 / Math.PI);
  }
  if (point.x < 0 && point.y < 0) {
    return 180 + (Math.atan(point.y / point.x) * 180 / Math.PI);
  }
  return Math.atan(point.y / point.x) * 180 / Math.PI;
}
