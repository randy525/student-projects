package org.usm.budgetplanner.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.usm.budgetplanner.dto.request.UserLoginDTO;
import org.usm.budgetplanner.dto.response.SuccessfulAuthResponse;
import org.usm.budgetplanner.exception.ApplicationException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtService jwtService;
    private final AuthenticationProvider authenticationProvider;

    public SuccessfulAuthResponse login(UserLoginDTO loginDetails) {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(loginDetails.getUsername(), loginDetails.getPassword());
        Authentication authentication = authenticationProvider.authenticate(token);

        if (authentication.isAuthenticated()) {
            return SuccessfulAuthResponse.builder()
                    .token(jwtService.generateToken(loginDetails.getUsername()))
                    .build();
        } else {
            throw new ApplicationException("Invalid username or password");
        }
    }

}
