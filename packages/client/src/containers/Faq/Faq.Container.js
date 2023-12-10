import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './Faq.Style.css';

export const Faq = () => {
  return (
    <>
      <Helmet>
        <title>FAQ</title>
      </Helmet>
      <main>
        <h1 className="hero-header">FAQ</h1>
        <h2>What is NGL questions website?</h2>
        <p>
          NGL questions is the largest database of bot/fake messages from NGL
          app. With bot messages list - you will clearly know which messages on
          NGL were fake and therefore you won&apos;t need to upgrade on NGL app
          without the need.
        </p>
        <p>
          Also, this app helps you to find best NGL questions and messages for
          different topics.
        </p>
        <h2>Are there fake messages on NGL?</h2>
        <p>
          Yes, NGL app sends you fake/bot messages. You can distinguish them by
          seeing &quot;Sent with ❤️ from team NGL&quot;. They are also called
          &quot;love messages&quot;.
        </p>
        <p>
          You can compare bot messages in NGL with messages on this website.
        </p>
        <h2>How to suggest a bot message</h2>
        <p>
          <Link className="link" to="../questions/new">
            Submit a form
          </Link>{' '}
          or reach out via agorh @ icloud.com
        </p>
      </main>
    </>
  );
};
