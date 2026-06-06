import React from "react";
import "../styles/InfoPages.css";
import { FaShieldAlt, FaLock, FaEye, FaUserShield } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1>தனியுரிமைக் கொள்கை / Privacy Policy</h1>
        <p>நியூஸ் குரு வலைத்தளத்தின் தனியுரிமைக் கொள்கை விவரங்கள்</p>
      </div>

      <div className="info-card">
        <div className="info-section">
          <h2>
            <FaShieldAlt /> 1. அறிமுகம் (Introduction)
          </h2>
          <p>
            நியூஸ் குரு (News Ghuru) உங்கள் தனியுரிமையை மதிக்கிறது மற்றும் உங்கள் தனிப்பட்ட தகவல்களைப் பாதுகாப்பதில் உறுதியாக உள்ளது. இந்தத் தனியுரிமைக் கொள்கை, எங்களது சேவைகளைப் பயன்படுத்தும் போது உங்களிடமிருந்து நாங்கள் சேகரிக்கும் தகவல்களை எவ்வாறு கையாளுகிறோம் என்பதை விளக்குகிறது.
          </p>
          <p>
            At News Ghuru, we are committed to protecting your privacy and personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website.
          </p>
        </div>

        <div className="info-section">
          <h2>
            <FaEye /> 2. நாங்கள் சேகரிக்கும் தகவல்கள் (Information We Collect)
          </h2>
          <p>
            எங்கள் வலைத்தளத்தை நீங்கள் பயன்படுத்தும்போது, பின்வரும் தகவல்களை நாங்கள் சேகரிக்கலாம்:
          </p>
          <ul>
            <li>சந்தா செலுத்தும் போது அல்லது தொடர்பு கொள்ளும் போது நீங்கள் வழங்கும் பெயர் மற்றும் மின்னஞ்சல் முகவரி (Name and email address provided during subscription or contact).</li>
            <li>குக்கீகள் மற்றும் பகுப்பாய்வு தரவு (Cookies and analytical data like IP address, browser type, and page views) மூலம் சேகரிக்கப்படும் பயன்பாட்டுத் தரவு.</li>
          </ul>
        </div>

        <div className="info-section">
          <h2>
            <FaLock /> 3. தகவல்களின் பயன்பாடு (How We Use Information)
          </h2>
          <p>
            நாங்கள் சேகரிக்கும் தகவல்கள் பின்வரும் நோக்கங்களுக்காகப் பயன்படுத்தப்படுகின்றன:
          </p>
          <ul>
            <li>உங்களுக்குச் செய்திகள் மற்றும் அறிவிப்புகளை உடனுக்குடன் வழங்க (To provide you with news updates and notifications).</li>
            <li>எங்களது சேவைகளை மேம்படுத்த மற்றும் பயனர் அனுபவத்தை நல்வழிப்படுத்த (To improve our services and user experience).</li>
            <li>உங்கள் கேள்விகளுக்கு பதிலளிக்க மற்றும் ஆதரவு வழங்க (To respond to your inquiries and offer support).</li>
          </ul>
        </div>

        <div className="info-section">
          <h2>
            <FaUserShield /> 4. தரவுப் பாதுகாப்பு (Data Protection)
          </h2>
          <p>
            உங்கள் தனிப்பட்ட தகவல்கள் எந்தவொரு மூன்றாம் தரப்பினருக்கும் விற்கப்படவோ அல்லது பகிரப்படவோ மாட்டாது. உங்கள் தகவல்களின் பாதுகாப்பை உறுதிசெய்ய நாங்கள் தகுந்த பாதுகாப்பு நடைமுறைகளைப் பின்பற்றுகிறோம்.
          </p>
          <p>
            Your personal information is secure with us. We do not sell or share your data with third parties. We implement industry-standard security measures to protect your personal details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
