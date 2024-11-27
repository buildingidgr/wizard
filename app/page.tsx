import React, { useState } from 'react';

interface ContactDetails {
  fullName: string;
  email: string;
  phone: string;
}

const PinVerificationForm = ({ phoneNumber, initialRequestTime, onVerificationComplete }: { phoneNumber: string; initialRequestTime: number; onVerificationComplete: () => void }) => {
  // ... PinVerificationForm implementation ...
  return <div>PinVerificationForm</div>;
};


const App: React.FC = () => {
  const [contactDetails, setContactDetails] = React.useState<ContactDetails | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [initialRequestTime, setInitialRequestTime] = React.useState<number | null>(null);

  const handleContactDetailsSubmit = (details: { fullName: string; email: string; phone: string }, requestTime: number) => {
    setContactDetails(details);
    setInitialRequestTime(requestTime);
    setIsVerifying(true);
  };

  const handleVerificationComplete = () => {
    setIsVerifying(false);
    // ... handle verification complete logic ...
  };

  return (
    <div>
      {/* ... Contact details form ... */}
      <button onClick={() => handleContactDetailsSubmit({ fullName: 'Test', email: 'test@example.com', phone: '1234567890' }, Date.now())}>Submit</button>

      {isVerifying && (
        <PinVerificationForm
          phoneNumber={contactDetails!.phone}
          initialRequestTime={initialRequestTime!}
          onVerificationComplete={handleVerificationComplete}
        />
      )}

      {contactDetails && !isVerifying && (
        <PinVerificationForm
          phoneNumber={contactDetails.phone}
          initialRequestTime={initialRequestTime!}
          onVerificationComplete={handleVerificationComplete}
        />
      )}
    </div>
  );
};

export default App;

