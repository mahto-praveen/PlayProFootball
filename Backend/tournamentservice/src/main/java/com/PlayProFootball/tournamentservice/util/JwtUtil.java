package com.PlayProFootball.tournamentservice.util;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    public Integer extractOrganizationId(Principal principal) {
        String token = ((UsernamePasswordAuthenticationToken) principal)
                .getCredentials().toString();

        Claims claims = Jwts.parser()
                .setSigningKey(secret.getBytes())
                .parseClaimsJws(token)
                .getBody();

        // Safe cast: JWT claims are stored as Integer only if you set them that way
        Object orgIdObj = claims.get("organizationId");
        return (orgIdObj instanceof Integer) ? (Integer) orgIdObj : Integer.parseInt(orgIdObj.toString());
    }
}
