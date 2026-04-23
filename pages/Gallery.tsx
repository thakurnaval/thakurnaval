
import React from 'react';
import { Camera, MapPin, ImagePlus, Linkedin } from 'lucide-react';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { GALLERY_IMAGES } from '../constants';
import { GalleryImage } from '../types';

const Gallery: React.FC = () => {
  const getImageUrl = (img: GalleryImage, size: number) => {
    if (img.src) return img.src;
    return `https://images.unsplash.com/photo-${img.imgId}?q=80&w=${size}&auto=format&fit=crop`;
  };

  const getSrcSet = (img: GalleryImage) => {
    if (img.src) return undefined;
    return `
      https://images.unsplash.com/photo-${img.imgId}?q=80&w=400&auto=format&fit=crop 400w,
      https://images.unsplash.com/photo-${img.imgId}?q=80&w=800&auto=format&fit=crop 800w,
      https://images.unsplash.com/photo-${img.imgId}?q=80&w=1200&auto=format&fit=crop 1200w
    `;
  };

  const hasImages = GALLERY_IMAGES.length > 0;

  return (
    <>
      <SEO
        title="Photo Gallery | Naval Thakur's Engagements & Events"
        description="Photos from Naval Thakur's speaking engagements, workshops, and community events — conferences, meetups, and corporate sessions."
      />
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Moments from conferences, workshops, and community events.
          </p>
        </div>
      </div>

      <Section>
        {hasImages ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg bg-slate-100 dark:bg-slate-800 aspect-[4/3]">
                <img
                  src={getImageUrl(img, 800)}
                  srcSet={getSrcSet(img)}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  alt={`${img.title} — ${img.location}`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width="800"
                  height="600"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-lg mb-1 flex items-center">
                      <Camera size={16} className="mr-2 text-secondary" />
                      {img.title}
                    </h3>
                    <p className="text-slate-300 text-sm flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {img.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImagePlus className="w-9 h-9 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Photos Coming Soon
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Event photos from conferences, workshops, and community engagements are being compiled. In the meantime, follow Naval on LinkedIn for live updates from events.
            </p>
            <a
              href="https://www.linkedin.com/in/navalthakur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white font-semibold rounded-lg hover:bg-[#006399] transition-colors"
            >
              <Linkedin size={18} />
              Follow on LinkedIn
            </a>
          </div>
        )}
      </Section>
    </>
  );
};

export default Gallery;
