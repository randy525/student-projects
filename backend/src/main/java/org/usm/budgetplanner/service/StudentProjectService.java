package org.usm.budgetplanner.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.usm.budgetplanner.domain.StudentProject;
import org.usm.budgetplanner.dto.request.CreateProjectRequest;
import org.usm.budgetplanner.dto.response.ProjectResponse;
import org.usm.budgetplanner.exception.ApplicationException;
import org.usm.budgetplanner.repository.StudentProjectRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentProjectService {

    private final StudentProjectRepository projectRepository;

    public List<ProjectResponse> getAllProjects() {
        List<StudentProject> projects = projectRepository.findAll();
        log.info("Found {} projects in database", projects.size());
        return projects.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ProjectResponse getProjectById(Long id) {
        log.info("Fetching project with id: {}", id);
        StudentProject project = projectRepository.findById(id)
                .orElseThrow(() -> new ApplicationException("Project not found with id: " + id));
        
        log.info("Found project: {}", project.getTitle());
        log.info("Student photo: {}", project.getStudentPhoto());
        
        return mapToResponse(project);
    }

    public ProjectResponse createProject(CreateProjectRequest request) {
        StudentProject project = StudentProject.builder()
                .title(request.getTitle())
                .shortDescription(request.getShortDescription())
                .fullDescription(request.getFullDescription())
                .studentName(request.getStudentName())
                .studentPhoto(request.getStudentPhoto())
                .githubUrl(request.getGithubUrl())
                .youtubeUrl(request.getYoutubeUrl())
                .demoUrl(request.getDemoUrl())
                .otherLinks(request.getOtherLinks())
                .build();

        StudentProject savedProject = projectRepository.save(project);
        return mapToResponse(savedProject);
    }

    private ProjectResponse mapToResponse(StudentProject project) {
        ProjectResponse response = ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .shortDescription(project.getShortDescription())
                .fullDescription(project.getFullDescription())
                .studentName(project.getStudentName())
                .studentPhoto(project.getStudentPhoto())
                .githubUrl(project.getGithubUrl())
                .youtubeUrl(project.getYoutubeUrl())
                .demoUrl(project.getDemoUrl())
                .otherLinks(project.getOtherLinks())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
        
        log.info("Mapped project {} to response with student photo: {}", 
                project.getTitle(), 
                project.getStudentPhoto());
        
        return response;
    }
} 