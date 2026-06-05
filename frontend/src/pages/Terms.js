import React from "react";
import "../styles/InfoPages.css";
import { FaFileContract, FaGavel, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Terms = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>விதிமுறைகள் மற்றும் நிபந்தனைகள் / Terms & Conditions</h1>
        <p>நியூஸ் குரு சேவைகளைப் பயன்படுத்துவதற்கான விதிகள்</p>
      </div>

      <div className="info-card">
        <div className="info-section">
          <h2>
            <FaFileContract /> 1. விதிமுறைகளை ஒப்புக்கொள்ளுதல் (Acceptance of Terms)
          </h2>
          <p>
            நியூஸ் குரு (News Ghuru) வலைத்தளத்தை அணுகுவதன் அல்லது பயன்படுத்துவதன் மூலம், இந்த விதிமுறைகள் மற்றும் நிபந்தனைகளுக்குக் கட்டுப்பட ஒப்புக்கொள்கிறீர்கள். இந்த விதிமுறைகளை நீங்கள் ஏற்கவில்லை எனில், எங்கள் வலைத்தளத்தைப் பயன்படுத்த வேண்டாம் என கேட்டுக்கொள்ளப்படுகிறீர்கள்.
          </p>
          <p>
            By accessing or using the News Ghuru website, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.
          </p>
        </div>

        <div className="info-section">
          <h2>
            <FaGavel /> 2. அறிவுசார் சொத்துரிமை (Intellectual Property Rights)
          </h2>
          <p>
            எங்கள் வலைத்தளத்தில் உள்ள கட்டுரைகள், செய்திகள், படங்கள், லோகோக்கள் மற்றும் பிற உள்ளடக்கங்கள் அனைத்தும் நியூஸ் குருவின் சொத்தாகும். எங்கள் முன் அனுமதியின்றி இவற்றை நகலெடுக்கவோ, வெளியிடவோ அல்லது விநியோகிக்கவோ கூடாது.
          </p>
          <p>
            All content including articles, logos, designs, text, and graphics on this website are the property of News Ghuru. Copying, republishing, or redistributing this content without prior written permission is strictly prohibited.
          </p>
        </div>

        <div className="info-section">
          <h2>
            <FaCheckCircle /> 3. பயனர் பொறுப்புகள் (User Conduct)
          </h2>
          <p>
            எங்கள் சேவைகளைப் பயன்படுத்தும்போது, சட்டவிரோதமான அல்லது எங்களது நற்பெயருக்குக் கேடு விளைவிக்கும் எவ்விதமான செயல்பாடுகளிலும் நீங்கள் ஈடுபடக்கூடாது.
          </p>
          <ul>
            <li>தவறான தகவல்களைப் பரப்பக்கூடாது (Do not propagate false news or misleading information).</li>
            <li>கருத்துப் பெட்டியில் பிறரை அவதூறாகப் பேசவோ, அச்சுறுத்தவோ கூடாது (Do not post abusive or threatening comments).</li>
          </ul>
        </div>

        <div className="info-section">
          <h2>
            <FaExclamationTriangle /> 4. பொறுப்புத் துறப்பு (Limitation of Liability)
          </h2>
          <p>
            எங்கள் தளம் நம்பகமான செய்திகளை வழங்க முயல்கிறது. இருப்பினும், வலைத்தளத்தில் உள்ள தகவல்களின் முழுமையான துல்லியம் அல்லது நம்பகத்தன்மைக்கு நாங்கள் எவ்வித உத்தரவாதமும் அளிக்கவில்லை.
          </p>
          <p>
            While we strive to publish accurate and reliable news, News Ghuru does not warrant the completeness, accuracy, or timeliness of the information on the website. Use of information is at your own risk.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
