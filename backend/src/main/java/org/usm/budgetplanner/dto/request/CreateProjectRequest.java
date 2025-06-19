package org.usm.budgetplanner.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class CreateProjectRequest {
    private String title;
    private String shortDescription;
    private String fullDescription;
    private String studentName;
    private String studentPhoto;
    private String githubUrl;
    private String youtubeUrl;
    private String demoUrl;
    private String otherLinks;
} 