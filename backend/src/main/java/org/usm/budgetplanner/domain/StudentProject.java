package org.usm.budgetplanner.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "student_projects")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentProject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String fullDescription;

    @Column(nullable = false)
    private String studentName;

    @Column(name = "student_photo")
    private String studentPhoto;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "youtube_url")
    private String youtubeUrl;

    @Column(name = "demo_url")
    private String demoUrl;

    @Column(name = "other_links")
    private String otherLinks;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        updatedAt = java.time.LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }
} 