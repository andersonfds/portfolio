export enum MediaType {image, video}

export enum ProjectType { mobile, package, web }

export interface ProjectResumeModel {
    id: string;
    technology: string;
    appName: string;
    description: string;
    media: string;
    mediaType: MediaType;
    projectType: ProjectType;
    link?: string;
}