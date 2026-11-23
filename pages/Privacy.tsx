import React from 'react';
import { Link } from 'react-router-dom';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { OPEN_CONSENT_EVENT } from '../components/ConsentBanner';

const UPDATED = '24 November 2026';

const H2: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <h2 id={id} className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-3 scroll-mt-24">{children}</h2>
);
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{children}</p>
);

const Privacy: React.FC = () => (
  <>
    <SEO title="Privacy Policy | Naval Thakur" description="What personal data nthakur.com collects, why, how it is stored and how to ask for it to be deleted." />
    <div className="bg-primary text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-slate-200">Last updated {UPDATED}</p>
      </div>
    </div>
    <Section bg="white">
      <article className="max-w-3xl mx-auto">
        <P>
          This policy explains what personal data nthakur.com collects, why, and what you can do about it. It covers this website
          and its forms, guides and assessments. The short version: I collect only what you give me or agree to, I use it to reply
          and to send what you asked for, I never sell it, and you can ask me to delete it at any time.
        </P>

        <H2>Who is responsible</H2>
        <P>
          The site is run by Naval Thakur, who is responsible for your personal data (the "data fiduciary" under India's Digital
          Personal Data Protection Act 2023, and the "controller" under the EU and UK GDPR). For any privacy question or request,
          email <strong>contact@nthakur.com</strong>.
        </P>

        <H2>What I collect, and why</H2>
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-slate-500 dark:text-slate-400">
                <th className="py-2 pr-4 border-b border-slate-200 dark:border-slate-700">When you…</th>
                <th className="py-2 pr-4 border-b border-slate-200 dark:border-slate-700">I collect</th>
                <th className="py-2 border-b border-slate-200 dark:border-slate-700">To</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300 align-top">
              <tr><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Use the contact form</td><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Name, email, phone number (optional), topic and message</td><td className="py-2 border-b border-slate-100 dark:border-slate-800">Reply to you</td></tr>
              <tr><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Download a guide or template</td><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Email address, which guide you asked for, and your readiness-check score if you completed it</td><td className="py-2 border-b border-slate-100 dark:border-slate-800">Give you the guide, and occasionally send related practical content</td></tr>
              <tr><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Complete an assessment</td><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Name and email (if given), your scores and maturity level</td><td className="py-2 border-b border-slate-100 dark:border-slate-800">Send your report and understand which areas people need help with</td></tr>
              <tr><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Subscribe to the newsletter, or join the book or premium-report list</td><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Email address</td><td className="py-2 border-b border-slate-100 dark:border-slate-800">Send the newsletter or let you know when something is ready</td></tr>
              <tr><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Browse the site, if you accept analytics</td><td className="py-2 pr-4 border-b border-slate-100 dark:border-slate-800">Pages visited, approximate location, device and browser, via Google Analytics cookies</td><td className="py-2 border-b border-slate-100 dark:border-slate-800">See which pages and guides are useful</td></tr>
              <tr><td className="py-2 pr-4">Visit any page</td><td className="py-2 pr-4">Standard server logs (IP address, time, page requested)</td><td className="py-2">Keep the site secure and running</td></tr>
            </tbody>
          </table>
        </div>
        <P>Assessment answers are scored in your browser. Only the results you choose to submit, with your email, are sent to me.</P>

        <H2>Legal basis</H2>
        <P>
          I process your data with your consent, which you give by submitting a form or accepting analytics. You can withdraw
          consent at any time; this doesn't affect anything done before you withdrew it. Server logs are kept for the legitimate
          purpose of running and securing the site.
        </P>

        <H2 id="cookies">Cookies and analytics</H2>
        <P>
          The only non-essential cookies are from Google Analytics, and they are set only if you click "Accept analytics" in the
          banner. If you decline, Google Analytics is not loaded. The site also remembers your choice, and small preferences such
          as dark mode, in your browser's local storage.
        </P>
        <P>
          <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
            className="underline font-semibold text-primary dark:text-secondary">Change your cookie settings</button>
        </P>

        <H2>Where your data is stored and who sees it</H2>
        <P>
          Form submissions are sent to a Google Apps Script and stored in my Google account. The site is hosted on Google Cloud.
          Analytics data, if you accept it, is processed by Google Analytics. Pages also load fonts from Google Fonts and some
          images from Unsplash, which receive your IP address when your browser fetches them. These providers may process data
          outside India and the EU under their own safeguards.
        </P>
        <P>I don't sell, rent or share your personal data with anyone else, and I don't use it for advertising.</P>

        <H2>How long I keep it</H2>
        <P>
          I keep form submissions for as long as needed to reply and to send what you asked for, and review them at least every
          two years. Newsletter and list sign-ups are kept until you unsubscribe or ask me to delete them. Google Analytics data
          is kept for 14 months. Server logs are kept for up to 30 days.
        </P>

        <H2>Your rights</H2>
        <P>
          You can ask to see the personal data I hold about you, correct it, delete it, or withdraw your consent. Under the DPDP
          Act you can also nominate someone to exercise these rights on your behalf, and raise a grievance with me; if you're
          not satisfied with my response, you can complain to the Data Protection Board of India. In the EU or UK you can also
          complain to your local data protection authority.
        </P>
        <P>
          To make any request, email <strong>contact@nthakur.com</strong> from the address concerned. I'll respond within 30 days,
          usually much sooner.
        </P>

        <H2>Children</H2>
        <P>This site is for working professionals and isn't directed at children. I don't knowingly collect data from anyone under 18.</P>

        <H2>Security</H2>
        <P>The site is served over HTTPS, and access to stored submissions is limited to my own accounts, protected with multi-factor authentication.</P>

        <H2>Changes</H2>
        <P>If this policy changes, the new version will be posted here with a new date. Significant changes will be highlighted on the site.</P>

        <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
          Questions? <Link to="/contact" className="underline">Get in touch</Link> or email contact@nthakur.com.
        </p>
      </article>
    </Section>
  </>
);

export default Privacy;
