package org.usm.budgetplanner.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.usm.budgetplanner.domain.StudentProject;

@Repository
public interface StudentProjectRepository extends JpaRepository<StudentProject, Long> {
} 