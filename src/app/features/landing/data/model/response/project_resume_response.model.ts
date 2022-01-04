import { Transform } from "class-transformer";
import { MediaType, ProjectResumeModel, ProjectType } from "../project_resume.model";

export class ProjectResumeResponseModel implements ProjectResumeModel {
    id!: string;
    technology!: string;
    appName!: string;
    description!: string;
    media!: string;
    link?: string;
    
    @Transform(({value}) => MediaType[value])
    mediaType!: MediaType;

    @Transform(({value}) => ProjectType[value])
    projectType!: ProjectType;
}