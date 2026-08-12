import java.util.Scanner;

public class pass {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        String adminEmail = "admin@gmail.com";
        String adminPassword = "1234";

        String residentEmail = "resident@gmail.com";
        String residentPassword = "1234";

        String securityEmail = "security@gmail.com";
        String securityPassword = "1234";

        System.out.println("===== SMART SOCIETY MANAGEMENT SYSTEM =====");

        System.out.print("Enter Email: ");
        String inputEmail = sc.nextLine();

        System.out.print("Enter Password: ");
        String inputPassword = sc.nextLine();

        if (inputEmail.equals(adminEmail) &&
            inputPassword.equals(adminPassword)) {

            System.out.println("Login Successful!");
            System.out.println("Welcome Admin");
            System.out.println("You can manage residents, complaints, payments, visitors and notices.");

        } else if (inputEmail.equals(residentEmail) &&
                   inputPassword.equals(residentPassword)) {

            System.out.println("Login Successful!");
            System.out.println("Welcome Resident");
            System.out.println("You can raise complaints, pay maintenance and book amenities.");

        } else if (inputEmail.equals(securityEmail) &&
                   inputPassword.equals(securityPassword)) {

            System.out.println("Login Successful!");
            System.out.println("Welcome Security Guard");
            System.out.println("You can manage visitors and vehicle entry/exit.");

        } else {

            System.out.println("Invalid Email or Password!");
        }

        sc.close();
    }
}