import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cl from './Swither_language.module.css';

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'ro', label: 'RO' },
] as const;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    LANGUAGES.find((lang) => lang.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cl.languageSwitcher} ref={rootRef}>
      <button
        type="button"
        className={cl.languageButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentLanguage.label}
        <span className={`${cl.arrow} ${isOpen ? cl.arrowOpen : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className={cl.dropdown} role="listbox">
          {LANGUAGES.map((language) => (
            <button
              key={language.code}
              type="button"
              className={`${cl.dropdownItem} ${
                language.code === currentLanguage.code ? cl.dropdownItemActive : ''
              }`}
              onClick={() => changeLanguage(language.code)}
              role="option"
              aria-selected={language.code === currentLanguage.code}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
