package org.usm.budgetplanner.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ProjectResponse {
    private Long id;
    private String title;
    private String shortDescription;
    private String fullDescription;
    private String studentName;
    private String studentPhoto;
    private String githubUrl;
    private String youtubeUrl;
    private String demoUrl;
    private String otherLinks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 