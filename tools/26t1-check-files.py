import os

FOLDER = "D:\\Downloads\\26T1 Nộp sổ đoàn"

NAMES_26T1 = [
    "Nguyễn Mai Gia Bảo",
    "Võ Đỗ Ngọc Châu",
    "Nguyễn Cường",
    "Nguyễn Thành Đạt",
    "Hồ Ngọc Diệp",
    "Nguyễn Ngọc Dũng",
    "Hồ Quốc Duy",
    "Nguyễn Cẩm Hà",
    "Dụng Hữu Hiệp",
    "Nguyễn Kiêm Thanh Hiếu",
    "Lê Thị Hoa",
    "Nguyễn Văn Hòa",
    "Nguyễn Văn Minh Hoàng",
    "Trần Duy Hưng",
    "Nguyễn Đặng Quốc Huy",
    "Nguyễn Thị Phương Huyền",
    "Trần Giao Khanh",
    "Trịnh Lê Đăng Khoa",
    "Chế Thị Mai Linh",
    "Dương Trương Đức Minh",
    "Trương Tuấn Nam",
    "Lê Minh Ngọc",
    "Lê Minh Nguyên",
    "Lê Hồng Phong",
    "Thái Phan Thanh Phú",
    "Lê Khắc Quân",
    "Nguyễn Công Đăng Quang",
    "Mai Văn Quyền",
    "Nguyễn Văn Sinh",
    "Phan Quốc Thái",
    "Nguyễn Thật Thể",
    "Lê Nguyễn Minh Thông",
    "Đặng Hữu Tiến",
    "Lưu Bảo Trâm",
    "Lê Nguyễn Khánh Triều",
    "Lê Minh Tú",
    "Đoàn Minh Tuấn",
    "Nguyễn Thị Phương Uyên",
    "Trần Quốc Việt",
    "Tô Đình Vũ",
]


def get_existing_names():
    existing = set()
    for filename in os.listdir(FOLDER):
        if os.path.isfile(os.path.join(FOLDER, filename)):
            existing.add(os.path.splitext(filename)[0])
    return existing


existing = get_existing_names()

remaining = [name for name in NAMES_26T1 if name not in existing]
print()
for name in remaining:
    print(name)
print()

unknown = [name for name in existing if name not in NAMES_26T1]
if len(unknown) > 0:
    for name in unknown:
        print(f"⚠ {name}")
    print()
