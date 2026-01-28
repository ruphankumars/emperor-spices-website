import React from 'react';
import { Check, Award, Shield, Leaf, Building2 } from 'lucide-react';

const CertificationsStrip = () => {
    const certifications = [
        { icon: Check, label: 'FSSAI Licensed' },
        { icon: Award, label: 'ISO 22000:2018' },
        { icon: Shield, label: 'HACCP Certified' },
        { icon: Leaf, label: 'Spices Board India' },
        { icon: Building2, label: 'APEDA Registered' },
        { icon: Check, label: 'IEC Code Holder' },
        { icon: Leaf, label: 'GI-Tagged' },
        { icon: Award, label: 'Three Star Export House' },
    ];

    return (
        <div className="certs-strip">
            {certifications.map((cert, index) => (
                <div key={index} className="cert-badge">
                    <cert.icon size={16} />
                    <span>{cert.label}</span>
                </div>
            ))}
        </div>
    );
};

export default CertificationsStrip;
