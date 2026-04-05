package com.sapient.app.Banking.App.config;

import com.sapient.app.Banking.App.filter.JwtAuthFilter; 
import com.sapient.app.Banking.App.service.CustomerServiceImpl; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.context.annotation.Bean; 
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager; 
import org.springframework.security.authentication.AuthenticationProvider; 
import org.springframework.security.authentication.dao.DaoAuthenticationProvider; 
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration; 
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity; 
import org.springframework.security.config.annotation.web.builders.HttpSecurity; 
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity; 
import org.springframework.security.config.http.SessionCreationPolicy; 
import org.springframework.security.core.userdetails.UserDetailsService; 
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; 
import org.springframework.security.crypto.password.PasswordEncoder; 
import org.springframework.security.web.SecurityFilterChain; 
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; 

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig { 

	@Autowired
	private JwtAuthFilter authFilter; 
	
	private final String[] AUTH_WHITELIST = {
	        "/v3/api-docs/**",
	        "v3/api-docs/**",
	        "/swagger-ui/**",
	        "swagger-ui/**",

	        "/login",
	        "/customer"
	};

	// User Creation 
    @Bean
    public UserDetailsService userDetailsService() { 
        return new CustomerServiceImpl(); 
    } 

	// Configuring HttpSecurity 
	@SuppressWarnings("deprecation")
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception { 
		http.csrf(csrf->csrf.disable())
				.cors(cors->cors.configure(http))
				.authorizeHttpRequests(auth->auth.requestMatchers(AUTH_WHITELIST).permitAll()
				//.requestMatchers( HttpMethod.POST,"/public/**", "/customer").permitAll()
		//		.requestMatchers("/customer/**").authenticated()
		//		.requestMatchers("/addActivity/**").authenticated()
		//		.requestMatchers("/deposit-money/**").authenticated()
		//		.requestMatchers("/withdraw-money/**").authenticated()
				.anyRequest().authenticated()) // Require authentication for any other request
			    .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
			  
		http.addFilterBefore(authFilter,UsernamePasswordAuthenticationFilter.class);
		return http.build();
      
				
	} 

	// Password Encoding 
	@Bean
	public PasswordEncoder passwordEncoder() { 
		return new BCryptPasswordEncoder(); 
	} 

	@Bean
	public AuthenticationProvider authenticationProvider() { 
		DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(); 
		authenticationProvider.setUserDetailsService(userDetailsService()); // Use setUserDetailsService
	    authenticationProvider.setPasswordEncoder(passwordEncoder()); 
		return authenticationProvider; 
	} 

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception { 
		return config.getAuthenticationManager(); 
	} 


} 
