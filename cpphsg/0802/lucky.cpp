#include <bits/stdc++.h>
using namespace std;

unordered_map<int, int> l;
int n, x;
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    freopen("lucky.inp", "r", stdin);
    freopen("lucky.out", "w", stdout);
    cin >> n;
    while (n--) {
        cin >> x;
        l[x]++;
    }
    cin >> n;
    while (n--) {
        cin >> x;
        cout << l[x] << "\n";
    }
    return 0;
}

