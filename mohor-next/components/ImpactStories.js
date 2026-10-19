'use client';

import { useState } from 'react';

export default function ImpactStories({ stories }) {
  const [index, setIndex] = useState(0);
  if (!stories.length) return null;
  const story = stories[Math.min(index, stories.length - 1)];

  return (
    <section className="impact-stories" id="impact-stories" aria-labelledby="impact-stories-title">
      <div className="container impact-stories-container">
        <h2 className="impact-stories-title" id="impact-stories-title">Impact Stories</h2>
        <div className="impact-story-layout">
          <div className="impact-story-image-wrap">
            <img className="impact-story-image" id="impact-story-image" src={story.image} alt={story.image_alt} />
          </div>
          <article className="impact-story-content" aria-live="polite">
            <h3 className="impact-story-heading" id="impact-story-heading">{story.title}</h3>
            <p className="impact-story-description" id="impact-story-description">{story.description}</p>
            <a className="impact-story-link" id="impact-story-link" href={story.link}>Read more...</a>
          </article>
        </div>
        <div className="impact-story-pagination" id="impact-story-pagination" role="group" aria-label="Choose an impact story">
          {stories.map((s, i) => (
            <button
              key={s.id}
              className="impact-story-dot"
              type="button"
              aria-label={`Show impact story ${i + 1}: ${s.title}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
