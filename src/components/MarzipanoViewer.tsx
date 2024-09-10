import React, { useEffect, useRef } from 'react';
import Marzipano from 'marzipano';

const MarzipanoViewer: React.FC = () => {
  // Create a ref for the viewer DOM element
  const viewerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    // Initialize Marzipano viewer
    const viewer = new Marzipano.Viewer(viewerRef.current);

    // Define image source (equirectangular)
    const source = Marzipano.ImageUrlSource.fromString(
      'https://images.unsplash.com/photo-1557971370-e7298ee473fb'
    );

    // Define geometry for the panorama
    const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

    // Define view and initial settings
    const limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);
    const view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

    // Create the scene
    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view
    });

    // Display the scene
    scene.switchTo();

    return () => {
      // Cleanup when the component unmounts
      viewer.destroy();
    };
  }, []);

  return (
    // Container for Marzipano viewer
    <div ref={viewerRef} style={{ width: '100%', height: '500px' }}>
      {/* Viewer content will be rendered here */}
    </div>
  );
};

export default MarzipanoViewer;
