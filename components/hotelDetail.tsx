// components/HotelInfoCard.tsx
'use client';

import { SeasonInfo } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {
  faBellConcierge,
  faFutbol,
  faUmbrellaBeach,
  faBaby,
  faSpa,
  // faRingsWedding,
  faInfoCircle,
  faBed,
  faUtensils,
  faSwimmingPool,
  faSun,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

interface HotelInfoCardProps {
  data: SeasonInfo;
}

// Icon mapping
const iconMap: Record<string, any> = {
  'fa-regular fa-bell-concierge': faUtensils,
  'fa-regular fa-futbol': faFutbol,
  'fa-regular fa-umbrella-beach': faUmbrellaBeach,
  'fa-solid fa-baby': faBaby,
  'fa-regular fa-spa': faSpa,
  // 'fa-regular fa-rings-wedding': faRingsWedding,
  'fa-regular fa-circle-check': faCheckCircle,
};

// Mobile device detection
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// CollapsibleSection component
interface CollapsibleSectionProps {
  title: string;
  icon?: any;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  isMobile?: boolean;
}

function CollapsibleSection({
  title,
  icon,
  defaultOpen = true,
  children,
  className = '',
  isMobile = false,
  id
}: CollapsibleSectionProps & { id?: string }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
        style={{ minHeight: isMobile ? '60px' : 'auto' }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && <FontAwesomeIcon icon={icon} className="text-blue-500 text-lg md:text-xl flex-shrink-0" />}
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 truncate">{title}</h3>
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="text-gray-400 text-sm md:text-base flex-shrink-0 ml-2"
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2">
          {children}
        </div>
      </div>
    </div>
  );
}

// CollapsibleListItem component
interface CollapsibleListItemProps {
  title: string;
  children: React.ReactNode;
  isMobile?: boolean;
}

function CollapsibleListItem({ title, children, isMobile = false }: CollapsibleListItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors touch-manipulation"
        style={{ minHeight: isMobile ? '56px' : 'auto' }}
      >
        <span className="font-medium text-gray-700 text-sm md:text-base truncate pr-2">{title}</span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="text-gray-400 text-xs md:text-sm flex-shrink-0"
        />
      </button>

      <div
        className={`transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="p-3 md:p-4 pt-0">
          {children}
        </div>
      </div>
    </div>
  );
}

// Mobile Header Component
function MobileHeader({ title, startDate, endDate, active }: {
  title: string;
  startDate: string;
  endDate: string;
  active: boolean;
}) {
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, ' ');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-b-3xl p-4 md:p-6 mb-6 shadow-lg sticky top-0 z-10">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl md:text-2xl font-bold truncate">{title}</h1>
        <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
          {active ? 'AKTİF' : 'PASİF'}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faSun} className="text-yellow-300" />
          {startDate && <span>Başlangıç: {formatDate(startDate)}</span>}
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-300" />
          {endDate && <span>Bitiş: {formatDate(endDate)}</span>}
        </div>
      </div>
    </div>
  );
}

// Mobile Navigation Bar
function MobileNavBar() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Genel', icon: faInfoCircle },
    { id: 'themes', label: 'Temalar', icon: faCheckCircle },
    { id: 'facilities', label: 'Olanaklar', icon: faBed },
    { id: 'food', label: 'Yemek', icon: faUtensils },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header yüksekliği
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20 md:hidden">
      <div className="flex justify-around p-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              scrollToSection(section.id);
            }}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeSection === section.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
          >
            <FontAwesomeIcon icon={section.icon} className="text-lg mb-1" />
            <span className="text-xs font-medium">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HotelInfoCard({ data }: HotelInfoCardProps) {
  const isMobile = useIsMobile();

  // Format date from "01-Nisan-2026" to "01 Nisan 2026"
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, ' ');
  };

  // Parse HTML safely
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  if (!data?.title) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {
        data?.title &&
        <MobileHeader
          title={data.title}
          startDate={data.startDate || ''}
          endDate={data.endDate || ''}
          active={data.active}
        />}

      {/* Mobile Navigation */}
      {/* <MobileNavBar /> */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 pb-24 md:pb-6">
        <div className="space-y-4 md:space-y-6">
          {/* Mobile Quick Info Cards */}
          {isMobile && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faBed} className="text-green-500" />
                  <span className="text-sm font-medium text-gray-700">Check-in</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{data.importantInfo.checkInTime}</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <FontAwesomeIcon icon={faBed} className="text-red-500" />
                  <span className="text-sm font-medium text-gray-700">Check-out</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{data.importantInfo.checkOutTime}</span>
              </div>
            </div>
          )}


          <div className={`space-y-4 md:space-y-6 ${isMobile ? '' : 'grid md:grid-cols-3 gap-6'}`}>
            {/* Left Column - Mobile: Full width, Desktop: 2/3 */}
            <div className={isMobile ? 'space-y-4' : 'md:col-span-2 space-y-4'}>
              {/* Themes */}
              <CollapsibleSection
                title="Tema & Özellikler"
                icon={faCheckCircle}
                defaultOpen={!isMobile}
                isMobile={isMobile}
                id="themes"
              >
                <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
                  {data.generalInfo.themes.map((theme, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <FontAwesomeIcon icon={iconMap[theme.icon] || faCheckCircle} className="text-green-500 text-sm md:text-base" />
                      <span className="text-gray-700 font-medium text-sm md:text-base truncate">{theme.label}</span>
                    </div>
                  ))}
                </div>
              </CollapsibleSection>

              {/* General Info Text */}
              <CollapsibleSection
                title="Genel Bilgiler"
                icon={faInfoCircle}
                defaultOpen={!isMobile}
                isMobile={isMobile}
                id="overview"
              >
                <div
                  className="prose prose-sm md:prose-base prose-gray max-w-none"
                  dangerouslySetInnerHTML={createMarkup(data.generalInfo.generalInfoText)}
                />
              </CollapsibleSection>

              {/* Facility Categories */}
              <div className="space-y-4">
                {data.facilityCategories.map((category, index) => (
                  <CollapsibleSection
                    key={index}
                    title={category.title.label}
                    icon={iconMap[category.title.icon] || faBellConcierge}
                    defaultOpen={index === 0 && !isMobile}
                    isMobile={isMobile}
                    id={index === 0 ? 'facilities' : undefined}
                  >
                    {category.freeText && (
                      <div
                        className="mb-4 md:mb-6 prose prose-sm md:prose-base prose-gray max-w-none"
                        dangerouslySetInnerHTML={createMarkup(category.freeText)}
                      />
                    )}

                    {category.facilities && category.facilities.length > 0 && (
                      <div className="space-y-3">
                        {category.facilities.map((facility, fIndex) => (
                          <CollapsibleListItem
                            key={fIndex}
                            title={facility.label}
                            isMobile={isMobile}
                          >
                            <div className={`${isMobile ? 'flex-col' : 'flex flex-col md:flex-row md:items-center'} justify-between gap-3 p-3 bg-gray-50 rounded-lg`}>
                              <div className="flex-1">
                                {facility.description && (
                                  <p className="text-gray-600 text-sm md:text-base mb-2">{facility.description}</p>
                                )}
                                <p className="text-xs md:text-sm text-gray-500">
                                  Detaylı bilgi için resepsiyon ile iletişime geçebilirsiniz.
                                </p>
                              </div>
                              <span className={`px-2 md:px-3 py-1 text-xs md:text-sm font-medium rounded-full whitespace-nowrap mt-2 md:mt-0 ${facility.paid ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                {facility.paid ? '💳 Ücretli' : '✅ Ücretsiz'}
                              </span>
                            </div>
                          </CollapsibleListItem>
                        ))}
                      </div>
                    )}
                  </CollapsibleSection>
                ))}
              </div>
            </div>

            {/* Right Column - Mobile: Full width after left, Desktop: 1/3 */}
            <div className={isMobile ? 'space-y-4' : 'md:col-span-1 space-y-4'}>
              {/* Check-in/out - Desktop version */}
              {!isMobile && (
                <CollapsibleSection
                  title="Check-in & Check-out"
                  icon={faBed}
                  defaultOpen={true}
                  isMobile={isMobile}
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <span className="text-gray-700 font-medium block">Check-in Saati</span>
                        <span className="text-sm text-gray-500">Odanıza giriş yapabileceğiniz saat</span>
                      </div>
                      <span className="text-blue-600 font-bold text-lg">{data.importantInfo.checkInTime}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <div>
                        <span className="text-gray-700 font-medium block">Check-out Saati</span>
                        <span className="text-sm text-gray-500">Odanızdan çıkış yapmanız gereken saat</span>
                      </div>
                      <span className="text-blue-600 font-bold text-lg">{data.importantInfo.checkOutTime}</span>
                    </div>
                  </div>
                </CollapsibleSection>
              )}

              {/* Important Info */}
              <CollapsibleSection
                title="Önemli Bilgiler"
                icon={faInfoCircle}
                defaultOpen={false}
                isMobile={isMobile}
              >
                <div
                  className="prose prose-sm max-w-none text-gray-600"
                  dangerouslySetInnerHTML={createMarkup(data.importantInfo.desc)}
                />
              </CollapsibleSection>

              {/* General Facilities */}
              <CollapsibleSection
                title="Tesis Olanakları"
                icon={faSwimmingPool}
                defaultOpen={false}
                isMobile={isMobile}
              >
                <div className="space-y-3">
                  {data.generalInfo.facilities.map((facility, index) => (
                    <CollapsibleListItem
                      key={index}
                      title={facility.label}
                      isMobile={isMobile}
                    >
                      <div className={`${isMobile ? 'flex-col' : 'flex items-center justify-between'} gap-3 p-3 bg-gray-50 rounded-lg`}>
                        <div className="flex-1">
                          <p className="text-gray-600 text-sm md:text-base mb-2">
                            {facility.description || 'Detaylı bilgi için resepsiyon ile iletişime geçebilirsiniz.'}
                          </p>
                        </div>
                        <span className={`px-2 md:px-3 py-1 text-xs md:text-sm font-medium rounded-full whitespace-nowrap mt-2 md:mt-0 ${facility.paid ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                          {facility.paid ? '💳 Ücretli' : '✅ Ücretsiz'}
                        </span>
                      </div>
                    </CollapsibleListItem>
                  ))}
                </div>
              </CollapsibleSection>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}