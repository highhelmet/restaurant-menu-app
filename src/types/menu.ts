export interface MenuItem {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  price: string;
  image?: string;
}

export interface MenuSection {
  id: string;
  title: {
    en: string;
    es: string;
  };
  items: MenuItem[];
}

export interface Menu {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  sections: MenuSection[];
  layout: {
    orientation: 'portrait' | 'landscape';
    paperSize: '8.5x11' | '11x17' | 'A4' | 'A3';
    columns: number;
    margins: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
  displayLanguages: {
    en: boolean;
    es: boolean;
  };
}

export type LanguageKey = 'en' | 'es';
