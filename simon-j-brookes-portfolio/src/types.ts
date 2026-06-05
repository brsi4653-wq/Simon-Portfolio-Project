export interface ScriptPage {
  pageNum: number;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  type: string;
  status: string;
  description: string;
  videoUrl: string | null;
  posterUrl: string | null;
  stills: string[];
  credits: {
    presentedBy?: string;
    production?: string;
    filmBy?: string;
    starring?: string;
    musicBy?: string;
    editor?: string;
    productionDesigner?: string;
    directorOfPhotography?: string;
    executiveProducer?: string;
    writtenBy?: string;
    directedBy?: string;
    [key: string]: string | undefined;
  };
  tags: string[];
  scriptPages: ScriptPage[] | null;
  themes: string[];
  comingSoon?: boolean;
}

export type ActiveView = 'home' | 'reel' | 'projects' | 'about' | 'contact' | string; // strings are project ids like 'moving-forward'
