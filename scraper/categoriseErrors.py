CONCATENATE_STR_ERROR = "can only concatenate str"
NONETYPE_ERROR = "NoneType"

def main():
    concatenate_str_errors = []
    nonetype_errors = []
    other_errors = []

    with open("errors.txt", "r") as f:
        errors = f.readlines()

        for error in errors:
            if CONCATENATE_STR_ERROR in error:
                concatenate_str_errors.append(error)
            elif NONETYPE_ERROR in error:
                nonetype_errors.append(error)
            else:
                other_errors.append(error)

    with open("concatenateStrError.txt", "a") as concatStrFile:
        for error in concatenate_str_errors:
            concatStrFile.write(error)

    with open("noneTypeObjectError.txt", "a") as noneTypeFile:
        for error in nonetype_errors:
            noneTypeFile.write(error)

    with open("otherErrors.txt", "a") as otherFile:
        for error in other_errors:
            otherFile.write(error)
    
    print("Errors categorised!")

if __name__ == "__main__":
    main()